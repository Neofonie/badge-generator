<template>
  <label class="neo-checkbox checkbox__container neo-checkbox">
    {{ label }}
    <input
      type="checkbox"
      :checked="value"
      @change="$emit('change', $event.target.checked)"
    />
    <span class="checkmark" />
  </label>
</template>

<script>
export default {
  name: 'Checkbox',

  model: {
    event: 'change'
  },

  props: ['label', 'value']
};
</script>

<style lang="less">
.checkbox__container {
  @apply .flex .items-center .select-none .cursor-pointer;

  &:hover .checkmark {
    @apply .bg-gray-500;
  }

  input {
    @apply .absolute .h-0 .w-0 .opacity-0 .cursor-pointer;

    &:checked ~ .checkmark {
      @apply .bg-neo-red;

      &:after {
        @apply .block;
      }
    }
  }

  .checkmark {
    @apply .relative .h-6 .w-6 .bg-gray-300 .ml-1;

    &:after {
      @apply .absolute .hidden .border-white;
      content: '';
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
}
</style>
