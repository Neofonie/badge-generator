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

      // https://bennettfeely.com/clippy/
      &--circle {
        clip-path: circle(49% at center);
        //clip-path: circle(50% at 50% 50%);
      }

      &--triangle {
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      }

      &--round {
        border-radius: 33%;
      }

      &--rhombus {
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      }

      &--star {
        clip-path: polygon(
          50% 0%,
          61% 35%,
          98% 35%,
          68% 57%,
          79% 91%,
          50% 70%,
          21% 91%,
          32% 57%,
          2% 35%,
          39% 35%
        );
      }
    }
  }

  &__label {
    padding-left: var(--base-quarter);

    &__input {
      font-size: inherit;
      width: 100%;
      border: 0;
      background: var(--clr-grey);
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
      `badge--${data.badge.size}`,
      !showBorder ? 'badge--without-border' : '',
    ]"
    v-bind:style="{ backgroundColor: data.badge.clr }"
  >
    <div v-if="data.icon.base64" class="badge__icon">
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
          backgroundColor: data.icon.clr,
          backgroundImage: `url(${data.icon.base64})`,
          backgroundSize: data.icon.size,
          backgroundPosition: `${data.icon.x} ${data.icon.y}`,
        }"
        v-bind:class="[
          'badge__icon__img',
          `badge__icon__img--${data.icon.style}`,
        ]"
      ></div>
    </div>
    <div class="badge__label">
      <label
        v-bind:style="{ color: data.label.clr }"
        v-if="!data.isEditMode"
        for="badge__label__input"
      >
        {{ data.label.value }}
      </label>
      <input
        v-if="data.isEditMode"
        v-bind:value="data.label.value"
        v-bind:style="{ color: data.label.clr }"
        v-on:input="onChange('label', $event.target.value, index)"
        @keyup.enter="onChange('isEditMode', false, index)"
        type="text"
        id="badge__label__input"
        class="badge__label__input"
      />
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
    showBorder: {
      type: Boolean,
      default: true,
    },
    onChange: {
      type: Function,
    },
    data: {
      type: Object,
      isEditMode: {
        type: Boolean,
        default: false,
      },
      badge: {
        type: Object,
        size: {
          type: String,
          default: 'small', // big | small
        },
        clr: {
          type: String,
          default: '#fff',
        },
        default: 'small', // big | small
      },
      icon: {
        type: Object,
        base64: {
          type: String,
          default: '',
        },
        clr: {
          type: String,
          default: '#ccc',
        },
        style: {
          type: String,
          default: 'round', // square | circle | round | triangle
        },
        size: {
          type: String,
          default: 'contain',
        },
        x: {
          type: String,
          default: 'center',
        },
        y: {
          type: String,
          default: 'center',
        },
      },
      label: {
        type: Object,
        value: {
          type: String,
        },
        clr: {
          type: String,
          default: '#000',
        },
      },
    },
  },
  computed: {
    badgeIcon() {
      return this.data.icon;
    },
  },
  methods: {
    containIcon() {
      this.badgeIcon.size = this.badgeIcon.size === '' ? 'contain' : '';
    },
    resizeIcon(event) {
      // default: iconSize: contain;
      const deltaY = event.deltaY;
      const actualSize = parseInt(
        this.badgeIcon.size === 'contain' || this.badgeIcon.size === ''
          ? '100%'
          : this.badgeIcon.size
      );
      // up -> bigger
      if (deltaY > 0) {
        this.badgeIcon.size = actualSize + 10 + '%';
        // down -> smaller
      } else {
        this.badgeIcon.size = actualSize - 10 + '%';
      }
    },
    setIconOrigin(event) {
      // top - center - bottom
      // default: backgroundPosition: top center;
      const direction = event.code;
      const currentPosX = this.badgeIcon.x;
      const currentPosY = this.badgeIcon.y;
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

      if (nextPosX !== '') {
        this.badgeIcon.x = nextPosX;
      }
      if (nextPosY !== '') {
        this.badgeIcon.y = nextPosY;
      }
    },
  },
};
</script>
