<style lang="less">
  @selector: .badge;
  @{selector} {
    overflow: hidden;
    display: flex;
    justify-items: flex-start;
    align-items: center;
    border: solid 1px var(--clr-black);

    &__icon {
      height: 100%;
      padding: var(--base-quarter);

      &__img {
        display: block;
        height: 100%;
        background-repeat: no-repeat;

        //  square | circle | round | triangle
        &--circle {
          clip-path: circle(49% at center);
        }

        &--triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        &--round {
          border-radius: 33%;
        }
      }
    }

    &__label {
      padding-left: var(--base-quarter);

      &__input {
        font-size: inherit;
        width: 85%;
        border: 0;
        outline: solid 1px var(--clr-black);
        background: var(--clr-grey)
      }
    }

    &--without-border {
      border-color: transparent;
    }

    &,
    &--small {
      width: 6cm;
      height: 1.2cm;

      @{selector} {
        &__icon__img {
          width: 35px;
        }

        &__label {
          font-size: 36px;
        }
      }
    }

    &--big {
      width: 6cm;
      height: 1.7cm;

      @{selector} {
        &__icon__img {
          width: 54px;
        }

        &__label {
          font-size: 52px;
        }
      }
    }
  }
</style>

<template>
  <div
    v-bind:class="[
      'badge',
      `badge--${size}`,
      !showBorder ? 'badge--without-border' : '',
    ]"
    v-bind:style="{backgroundColor: badgeClr}">
    <div v-if="icon"
         class="badge__icon">
      <div
        tabindex="0"
        v-on:dblclick="containIcon"
        v-on:wheel.prevent="resizeIcon"
        v-on:keypress.prevent
        v-on:keydown.up.prevent="setIconOrigin"
        v-on:keydown.down.prevent="setIconOrigin"
        v-on:keydown.right.prevent="setIconOrigin"
        v-on:keydown.left.prevent="setIconOrigin"
        v-bind:style="{
          backgroundColor: iconClr,
          backgroundImage: `url(${icon})`,
          backgroundSize: iconSize,
          backgroundPosition: `${this.iconPositionX} ${this.iconPositionY}`,
        }"
        v-bind:class="[
          'badge__icon__img',
          `badge__icon__img--${iconStyle}`
        ]"
      ></div>
    </div>
    <div class="badge__label">
      <span
        v-bind:style="{color:labelClr}"
        v-if="!isEditMode">{{ label }}</span>
      <input
        v-if="isEditMode"
        v-bind:value="label"
        v-bind:style="{color:labelClr}"
        v-on:input="onInput($event, index)"
        @keyup.enter="onModeChange(false, index)"
        type="text"
        class="badge__label__input"/>
    </div>
  </div>
</template>

<script>
  const componentName = 'Badge';
  export default {
    name: componentName,
    data() {
      return {
        iconSize: '',
        iconPositionX: 'center',
        iconPositionY: 'center',
      };
    },
    props: {
      index: {
        type: Number,
      },
      isEditMode: {
        type: Boolean,
        default: false,
      },
      showBorder: {
        type: Boolean,
        default: true,
      },
      size: {
        type: String,
        default: 'small', // big | small
      },
      badgeClr: {
        type: String,
        default: '#fff',
      },
      label: {
        type: String,
      },
      labelClr: {
        type: String,
        default: '#000',
      },
      icon: {
        type: String,
        default: '',
      },
      iconClr: {
        type: String,
        default: '#ccc',
      },
      iconStyle: {
        type: String,
        default: 'round', // square | circle | round | triangle
      },
      onInput: {
        type: Function,
      },
      onModeChange: {
        type: Function,
      },
    },
    watch: {
      icon(nue) {
        this.icon = nue;
      },
      iconClr(nue) {
        this.iconClr = nue;
      },
      showBorder(nue) {
        this.showBorder = nue;
      },
      isEditMode(nue) {
        this.isEditMode = nue;
      },
    },
    methods: {
      containIcon() {
        this.iconSize = this.iconSize === '' ? 'contain' : '';
      },
      resizeIcon(event) {
        // default: iconSize: contain;
        const deltaY = event.deltaY;
        const acutalSize = parseInt(this.iconSize === 'contain' || this.iconSize === '' ? '100%' : this.iconSize);
        // up -> bigger
        if (deltaY > 0) {
          this.iconSize = (acutalSize + 10) + '%';
          // down -> smaller
        } else {
          this.iconSize = (acutalSize - 10) + '%';
        }
      },
      setIconOrigin(event) {
        // top - center - bottom
        // default: backgroundPosition: top center;
        const direction = event.code;
        const currentPosX = this.iconPositionX;
        const currentPosY = this.iconPositionY;
        let nextPosX = '';
        let nextPosY = '';

        switch (direction) {
          case 'ArrowUp':
            nextPosY = 'top';
            if (currentPosY === 'bottom') {
              nextPosY = 'center';
            }
            break;
          case 'ArrowDown':
            if (currentPosY === 'top') {
              nextPosY = 'center';
            } else if (currentPosY === 'center') {
              nextPosY = 'bottom';
            }
            break;
          case 'ArrowRight':
            if (currentPosX === 'left') {
              nextPosX = 'center';
            } else if (currentPosX === 'center') {
              nextPosX = 'right';
            }
            break;
          case 'ArrowLeft':
            nextPosX = 'left';
            if (currentPosX === 'right') {
              nextPosX = 'center';
            }
            break;
        }

        console.log(
          direction,
          'nextPosX', nextPosX,
          'nextPosY', nextPosY
        )

        if (nextPosX !== '') {
          this.iconPositionX = nextPosX;
        }
        if (nextPosY !== '') {
          this.iconPositionY = nextPosY;
        }
      }
    }
  }
</script>
