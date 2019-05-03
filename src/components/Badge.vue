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
        background: var(--clr-grey);

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
      <img
        v-bind:style="{backgroundColor: iconClr}"
        v-bind:class="[
          'badge__icon__img',
          `badge__icon__img--${iconStyle}`
        ]"
        v-bind:src="icon"/>
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
      }
    },
  }
</script>
