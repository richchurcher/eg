<template>
  <div>Posts: {{ postCount }}</div>
</template>

<script>
const computed = {
  postCount () { return this.$store.state.postCount }
}

export default {
  computed,
  name: 'home'
}
</script>
