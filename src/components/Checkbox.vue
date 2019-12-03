<template>
  <label class="overvue__settings mb-1 w-1/2 md:w-1/4">
    {{ label }}
    <input
      type="checkbox"
      :checked="value"
      @change="$emit('change', $event.target.checked)"
    />
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
