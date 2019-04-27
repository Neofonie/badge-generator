<template>
  <div v-bind:class="[
    'badge',
    `badge--${size}`,
    !showBorder ? 'badge--without-border' : '',
  ]">
    <div v-if="icon" class="badge__icon">
      <img v-bind:class="[
        'badge__icon__img',
        `badge__icon__img--${iconStyle}`
      ]"
           v-bind:src="icon"/>
    </div>
    <div class="badge__label">
      <span v-if="!isEditMode">{{ label }}</span>
      <input v-if="isEditMode"
             v-bind:value="label"
             v-on:input="onInput($event, index)"
             @keyup.enter="onModeChange(false, index)"
             type="text"
             class="badge__label__input"/>
    </div>
  </div>
</template>

<style lang="less">
  @selector: .badge;
  @{selector}{
    overflow: hidden;
    display: flex;
    justify-items: flex-start;
    align-items: center;
    border: solid 1px var(--clr-black);

    &__icon {
      height: 100%;
      padding: var(--base-half);

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
      padding-left: var(--base);

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
      &,
      .dpi-300 & {
        width: 709px;
        height: 142px;

        @{selector} {
          &__label {
            font-size: 70px;
          }
        }
      }

      .dpi-150 & {
        width: 355px;
        height: 71px;

        @{selector} {
          &__icon__img {
            width: 53px;
          }

          &__label {
            font-size: 42px;
          }
        }
      }

      .dpi-72 & {
        width: 170px;
        height: 34px;

        @{selector} {
          &__icon__img {
            width: 16px;
          }

          &__label {
            padding-left: var(--base-half);
            font-size: 23px;
          }
        }
      }
    }

    &--big {
      &,
      .dpi-300 & {
        width: 709px;
        height: 201px;

        @{selector} {
          &__label {
            font-size: 120px;
          }
        }
      }

      .dpi-150 & {
        width: 355px;
        height: 101px;

        @{selector} {
          &__icon__img {
            width: 83px;
          }

          &__label {
            font-size: 70px;
          }
        }
      }

      .dpi-72 & {
        width: 170px;
        height: 48px;

        @{selector} {
          &__icon__img {
            width: 30px;
          }

          &__label {
            padding-left: var(--base-half);
            font-size: 30px;
          }
        }
      }
    }
  }
</style>

<script>
  const componentName = 'Badge';
  export default {
    name: componentName,
    data() {
      return {
        _showBorder: true,
        _isEditMode: false,
      }
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
      label: {
        type: String,
      },
      icon: {
        type: String,
      },
      iconStyle: {
        type: String,
        default: 'square', // square | circle | round | triangle
      },
      onInput: {
        type: Function,
      },
      onModeChange: {
        type: Function,
      },
    },
    watch: {
      showBorder(nue) {
        this.showBorder = nue;
      },
      isEditMode(nue) {
        this.isEditMode = nue;
      }
    },
  }
</script>
