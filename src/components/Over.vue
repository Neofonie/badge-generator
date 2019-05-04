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
      position: relative;
      padding-top: var(--base);
      padding-bottom: calc(var(--font-bigger) + var(--base));

      .fa-plus-circle {
        position: absolute;
        color: var(--clr-red);
        font-size: var(--font-bigger);
        right: 0;
        bottom: 0;
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

        &__clrpikr {
          position: relative;

          .cp__wrapper {
            position: absolute;
            z-index: 1;
            left: 1px;
          }
        }
      }

      .fas {
        &.active {
          color: var(--clr-red);
        }

        font-size: var(--font);
      }

      .fa-times-circle {
        position: absolute;
        right: 0;
        top: var(--base-quarter);
      }

      .fa-plus-circle {
        position: absolute;
        right: 0;
        bottom: var(--base-quarter);
        color: var(--clr-red);
      }
    }
  }
</style>

<template>
  <div class="overvue">
    <span class="overvue__settings">
      Docsize: <b>{{ docsize }}</b>
      <!-- TODO: create selectbox: a4/a3 -->
    </span>
    <span class="overvue__settings">
      Format: <b>{{ format }}</b>
      <!-- TODO: create selectbox: hoch/quer -->
    </span>
    <span class="overvue__settings">
      Border: <input type="checkbox" v-model="showBorder"/>
    </span>
    <div class="overvue__settings">
      Badges:
      <div v-bind:class="[
        'overvue__badges',
      ]">
        <div class="overvue__badge"
             v-for="(data, key) in badges">

          <div class="overvue__badge__wrap"
               v-on:mouseover="toggleEdit(key, true)"
               v-on:mouseleave="toggleEdit(key, false)">

            <span class="overvue__badge__edit-bar--right">
              <i class="fas fa-plus-circle"
                 v-on:click="duplicate(key)"></i>
              <i class="fas fa-times-circle"
                 v-on:click="remove(key)"></i>
            </span>

            <span class="overvue__badge__edit-bar">
              <i class="fas fa-pen-square"
                 v-bind:class="{
                  active:data.isEditMode
                 }"></i>
              <span
                class="overvue__badge__sub-bar"
                v-if="data.isEditMode">
                <i title="badge size"
                   class="fas"
                   v-bind:class="{
                    'fa-search-minus': data.size === 'big',
                    'fa-search-plus': data.size === 'small',
                   }"
                   v-on:click="scale(key)"></i>
                <span class="overvue__badge__sub-bar__clrpikr">
                  <i title="choose badge background color"
                     class="fas fa-palette"
                     v-bind:class="{
                      active: data.showClrPicker === 'badge',
                     }"
                     v-on:click="toggleClrPicker(key, 'badge')"></i>
                  <color-picker
                    v-if="data.showClrPicker === 'badge'"
                    v-bind:color="data.badgeClr"
                    v-on:change="changeClr($event, key, 'badge')"></color-picker>
                </span>
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
                     v-bind:class="{
                      active: true,
                      'fa-circle': data.iconStyle === 'circle',
                      'fa-sort-up': data.iconStyle === 'triangle',
                      'fa-square': data.iconStyle === 'round',
                      'fa-square-full': data.iconStyle === 'square',
                     }"
                     v-on:click="iconStyle(key)"></i>
                </span>
                <span class="overvue__badge__sub-bar__clrpikr">
                  <i title="choose icon background color"
                     class="fas fa-palette"
                     v-bind:class="{
                      active: data.showClrPicker === 'icon',
                     }"
                     v-on:click="toggleClrPicker(key, 'icon')"></i>
                  <color-picker
                    v-if="data.showClrPicker === 'icon'"
                    v-bind:color="data.iconClr"
                    v-on:change="changeClr($event, key, 'icon')"></color-picker>
                </span>
                <span class="overvue__badge__sub-bar__spacer">
                  |
                </span>
                <span class="overvue__badge__sub-bar__clrpikr">
                  <i title="choose label color"
                     class="fas fa-palette"
                     v-bind:class="{
                      active: data.showClrPicker === 'label',
                     }"
                     v-on:click="toggleClrPicker(key, 'label')"></i>
                  <color-picker
                    v-if="data.showClrPicker === 'label'"
                    v-bind:color="data.labelClr"
                    v-on:change="changeClr($event, key, 'label')"></color-picker>
                </span>
              </span>
            </span>

            <Badge
              v-bind:index="key"
              v-bind:showBorder="showBorder"
              v-bind:onInput="onInput"
              v-bind:onModeChange="onModeChange"
              v-bind:isEditMode="data.isEditMode"
              v-bind:badgeClr="data.badgeClr"
              v-bind:icon="data.icon"
              v-bind:iconStyle="data.iconStyle"
              v-bind:iconClr="data.iconClr"
              v-bind:label="data.label"
              v-bind:labelClr="data.labelClr"
              v-bind:size="data.size"
            ></Badge>
          </div>
        </div>

        <i class="fas fa-plus-circle"
           v-on:click="add()"></i>
      </div>
    </div>
  </div>
</template>

<script>
  // https://github.com/v-comp/v-color/blob/master/demo.js
  import ColorPicker from '../../node_modules/v-color/dist/index.esm';
  import Badge from './Badge.vue';

  export default {
    name: 'Overvue',
    components: {
      Badge,
      ColorPicker,
    },
    data() {
      return {
        defaults: {
          docsize: ['A4'],
          styles: ['circle', 'triangle', 'round', 'square'],
        },
        docsize: 'A4',
        format: 'Hoch',
        showBorder: true,
        badges: [
          {
            isEditMode: false,
            showClrPicker: '',
            badgeClr: '#fff',
            icon: '',
            iconClr: '#ccc',
            iconStyle: 'round',
            label: 'Willy',
            labelClr: '#000',
            size: 'big',
          },
          {
            isEditMode: false,
            showClrPicker: '',
            badgeClr: '#fff',
            icon: '',
            iconClr: '#ccc',
            iconStyle: 'round',
            label: 'Willy',
            labelClr: '#000',
            size: 'small',
          },
        ],
      }
    },
    methods: {
      onInput(event, index) {
        this.badges[index].label = event.target.value;
      },
      onModeChange(boolean, index) {
        this.badges[index].isEditMode = boolean;
      },
      duplicate(lastKey) {
        this.badges.splice(lastKey + 1, 0, this.badges[lastKey]);
      },
      add() {
        this.badges.push({
          isEditMode: false,
          showClrPicker: '',
          badgeClr: '#fff',
          icon: '',
          iconClr: '#ccc',
          labelClr: '#000',
          iconStyle: 'round',
          label: 'Neu',
          labelClr: '',
          size: 'small',
        })
      },
      scale(index) {
        const size = this.badges[index].size;
        this.badges[index].size = (size === 'small') ? 'big' : 'small';
      },
      iconStyle(index) {
        const styles = this.defaults.styles;
        const actualStyle = this.badges[index].iconStyle;
        const actualStyleIndex = styles.indexOf(actualStyle);
        const nextStyle = styles[actualStyleIndex + 1] || styles[0];
        // iterate through styles
        this.badges[index].iconStyle = nextStyle;
      },
      toggleEdit(index, isEditMode) {
        this.badges[index].isEditMode = isEditMode;

        if (!isEditMode) {
          this.badges[index].showClrPicker = '';
        }
      },
      triggerUpload(index) {
        this.$refs.fileInput[0].click()
      },
      image(event, index) {
        const reader = new FileReader();
        const files = event.target.files; // FileList object
        const file = files[0];

        reader.addEventListener('load', () => {
          this.updateImage(index, reader.result);
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      },
      updateImage(index, base64) {
        // 'data:' + file.type + ';base64,' +
        this.badges[index].icon = base64;
      },
      remove(index) {
        this.badges.splice(index, 1);
      },

      toggleClrPicker(index, type) {
        const activeType = this.badges[index].showClrPicker;
        this.badges[index].showClrPicker = activeType !== type ? type : '';
      },
      changeClr(event, index, type) {
        const color = event.hex;
        this.badges[index][type + 'Clr'] = color;
      },
    },
  }
</script>
