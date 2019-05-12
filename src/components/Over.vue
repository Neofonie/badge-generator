<style lang="less">
  @import (less) "../../node_modules/v-color/dist/index.css";

  @selector: .overvue;
  @{selector} {
    &__settings {
      display: block;
    }

    &__badges {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      align-content: flex-start;
      position: relative;
      padding-top: var(--base);
      padding-bottom: calc(var(--font-bigger) + var(--base));

      &__add-button {
        color: var(--clr-red);
        font-size: var(--font-bigger);
        margin: var(--base-half);
      }
    }

    &__badge {
      &__wrap {
        display: inline-block;
        position: relative;
      }

      &__edit-bar {
        white-space: nowrap;
        user-select: none;
        position: absolute;
        z-index: 1;
        left: var(--base-quarter);
        bottom: var(--base-quarter);
        visibility: hidden;

        @{selector}__badge__wrap:hover & {
          visibility: visible;
        }

        &--right {
          position: absolute;
          z-index: 1;
          top: 0;
          bottom: 0;
          right: var(--base-quarter);
          visibility: hidden;

          @{selector}__badge__wrap:hover & {
            visibility: visible;
          }
        }
      }

      &__sub-bar {
        position: absolute;
        top: 21px;
        left: -4px;
        padding: var(--base-quarter);
        display: flex;
        align-items: center;
        background: #fff;
        border: solid 1px #000;
        border-top: 0;
        justify-content: space-between;

        &__spacer {
          padding: 0 var(--base-quarter);
        }

        &__icon-style {
          width: 24px;
          text-align: center;
          margin-right: var(--base-quarter);
        }
      }

      .fas {
        &.active {
          color: var(--clr-red);
        }

        font-size: var(--font);
      }

      &__remove-btn {
        position: absolute;
        right: 0;
        top: var(--base-quarter);
      }

      &__duplicate-btn {
        position: absolute;
        right: 0;
        bottom: var(--base-quarter);
        color: var(--clr-red);
      }
    }

    .docsize {
      border: solid 1px var(--clr-grey);
      margin-top: var(--base);
      padding-top: 0;

      &--A2 {
        width: 42.0cm;
        height: 59.4cm;

        &--landscape {
          width: 59.4cm;
          height: 42.0cm;
        }
      }

      &--A3 {
        width: 29.7cm;
        height: 42.0cm;

        &--landscape {
          width: 42.0cm;
          height: 29.7cm;
        }
      }

      &--A4 {
        width: 21.0cm;
        height: 29.7cm;

        &--landscape {
          width: 29.7cm;
          height: 21.0cm;
        }
      }

      &--A5 {
        width: 14.8cm;
        height: 21.0cm;

        &--landscape {
          width: 21.0cm;
          height: 14.8cm;
        }
      }
    }
  }
</style>

<template>
  <div class="overvue">
    <span class="overvue__settings">
      Docsize:
      <select v-model="docsize">
        <option>Bitte wählen</option>
        <option v-for="label in defaults.docsizes">{{label}}</option>
      </select>
    </span>
    <span class="overvue__settings">
      Format:
      <select v-model="docsizeFormat">
        <option>Bitte wählen</option>
        <option v-for="label in defaults.docsizeFormats">{{label}}</option>
      </select>
    </span>
    <span class="overvue__settings">
      Border: <input type="checkbox" v-model="showBorder"/>
    </span>
    <div class="overvue__settings">
      Badges: <input type="checkbox" v-model="uniqueBadges"/> unique?
    </div>
    <div v-bind:class="[
        'overvue__badges',
        `docsize docsize--${docsize}${docsizeFormat === 'landscape' ? '--' + docsizeFormat : ''}`,
      ]">
      <div class="overvue__badge"
           v-for="(data, key) in badges">

        <div class="overvue__badge__wrap"
             v-on:mouseover="toggleEdit(key, true)"
             v-on:mouseleave="toggleEdit(key, false)">

            <span class="overvue__badge__edit-bar--right">
              <i class="overvue__badge__duplicate-btn fas fa-plus-circle"
                 v-on:click="duplicate(key)"></i>
              <i class="overvue__badge__remove-btn fas fa-times-circle"
                 v-on:click="remove(key)"></i>
            </span>

          <span class="overvue__badge__edit-bar">
              <i class="overvue__badge__edit-btn fas fa-pen-square"
                 v-bind:class="{
                  active:data.isEditMode
                 }"></i>
              <span
                class="overvue__badge__sub-bar"
                v-if="data.isEditMode">
                <i title="badge size"
                   class="fas"
                   v-bind:class="{
                    'fa-search-minus': data.badge.size === 'big',
                    'fa-search-plus': data.badge.size === 'small',
                   }"
                   v-on:click="badgeStyle(key)"></i>
                <ClrPikr
                  title="choose badge background color"
                  type="badge"
                  v-bind:badgeKey="key"
                  v-bind:show="data.showClrPicker"
                  v-bind:clr="data.badge.clr"
                  v-bind:onToggle="toggleClrPicker"
                  v-bind:onChange="changeClr"
                />
                <span class="overvue__badge__sub-bar__spacer">
                  |
                </span>
                <span>
                  <i title="upload icon"
                     class="overvue__badge__sub-bar__icon-upload fas fa-image"
                     v-on:click="triggerUpload(key)"></i>
                  <input
                    type="file"
                    accept="image/*"
                    capture
                    style="display:none"
                    ref="fileInput"
                    v-on:change="image($event, key)"/>
                  <i title="icon style"
                     class="overvue__badge__sub-bar__icon-style fas"
                     v-bind:class="[
                      'active',
                      `fa-${faClassName(data.icon.style)}`,
                     ]"
                     v-on:click="iconStyle(key)"></i>
                </span>
                <ClrPikr
                  title="choose icon background color"
                  type="icon"
                  v-bind:badgeKey="key"
                  v-bind:show="data.showClrPicker"
                  v-bind:clr="data.icon.clr"
                  v-bind:onToggle="toggleClrPicker"
                  v-bind:onChange="changeClr"
                />
                <span class="overvue__badge__sub-bar__spacer">
                  |
                </span>
                <ClrPikr
                  title="choose label color"
                  type="label"
                  v-bind:badgeKey="key"
                  v-bind:show="data.showClrPicker"
                  v-bind:clr="data.label.clr"
                  v-bind:onToggle="toggleClrPicker"
                  v-bind:onChange="changeClr"
                />
              </span>
            </span>

          <Badge
            v-bind:index="key"
            v-bind:showBorder="showBorder"
            v-bind:onChange="onChange"
            v-bind:data="data"
          ></Badge>
        </div>
      </div>
      <i class="overvue__badges__add-button fas fa-plus-circle"
         v-on:click="add()"></i>
    </div>
  </div>
</template>

<script>
  import ClrPikr from './ClrPikr.vue';
  import Badge from './Badge.vue';

  export default {
    name: 'Overvue',
    components: {
      Badge,
      ClrPikr,
    },
    data() {
      return {
        defaults: {
          docsizes: ['A2', 'A3', 'A4', 'A5'],
          docsizeFormats: ['portrait', 'landscape'],
          styles: [
            {name: 'circle', fa: 'circle'},
            {name: 'triangle', fa: 'sort-up'},
            {name: 'round', fa: 'square'},
            {name: 'square', fa: 'square-full'},
            {name: 'star', fa: 'star'},
            {name: 'rhombus', fa: 'directions'},
          ],
        },
        docsize: 'A4',
        docsizeFormat: 'portrait',
        showBorder: true,
        uniqueBadges: false,
        badges: [
          {
            isEditMode: false,
            showClrPicker: '',
            badge: {
              size: 'big',
              clr: '#ffffff',
            },
            icon: {
              style: 'round',
              clr: '#cccccc',
              size: 'contain',
              x: 'center',
              y: 'center',
              base64: 'data:image/png;base64,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',
            },
            label: {
              value: 'Willy',
              clr: '#000000',
            },
          },
        ],
      }
    },
    methods: {
      onChange(type, data, index) {
        switch (type) {
          case 'label':
            const string = data;
            this.badges[index].label.value = string;
            break;
          case 'isEditMode':
            const boolean = data;
            this.badges[index].isEditMode = boolean;
            break
        }
      },

      add() {
        this.badges.push({
          isEditMode: false,
          showClrPicker: '',
          badge: {
            size: 'small',
            clr: '#fff',
          },
          icon: {
            base64: '',
            style: 'round',
            clr: '#ccc',
          },
          label: {
            value: 'Neu',
            clr: '#000',
          },
        })
      },
      duplicate(lastKey) {
        // edit one change all
        let data = this.badges[lastKey];
        // unique badges
        if (this.uniqueBadges) {
          data = {...this.badges[lastKey]}
        }
        data.isEditMode = false;
        this.badges.splice(lastKey + 1, 0, data);
      },
      remove(index) {
        this.badges.splice(index, 1);
      },

      badgeStyle(index) {
        const size = this.badges[index].badge.size;
        this.badges[index].badge.size = (size === 'small') ? 'big' : 'small';
      },

      toggleEdit(index, isEditMode) {
        this.badges[index].isEditMode = isEditMode;

        if (!isEditMode) {
          this.badges[index].showClrPicker = '';
        }
      },

      triggerUpload(index) {
        this.$refs.fileInput[0].click();
      },
      image(event, index) {
        const reader = new FileReader();
        const files = event.target.files; // FileList object
        const file = files[0];

        reader.addEventListener('load', () => {
          this.setImage(index, reader.result);
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      },
      setImage(index, base64) {
        // 'data:' + file.type + ';base64,' +
        this.badges[index].icon.base64 = base64;
      },

      faClassName(iconStyle) {
        const foundStyle = this.defaults.styles.filter((style) => {
          return style.name === iconStyle;
        })[0];
        return foundStyle.fa;
      },
      iconStyle(index) {
        const styles = this.defaults.styles;
        const actualStyle = this.badges[index].icon.style;
        let actualStyleIndex = 0;
        this.defaults.styles.map((style, index) => {
          if (style.name === actualStyle) {
            actualStyleIndex = index;
          }
        });
        const nextStyle = styles[actualStyleIndex + 1] || styles[0];
        // iterate through styles
        this.badges[index].icon.style = nextStyle.name;
      },

      toggleClrPicker(index, type) {
        const activeType = this.badges[index].showClrPicker;
        this.badges[index].showClrPicker = activeType !== type ? type : '';
      },
      changeClr(event, index, type) {
        const color = event.hex;
        this.badges[index][type].clr = color;
      },
    },
  }
</script>
