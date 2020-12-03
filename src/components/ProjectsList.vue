<template>
  <ul class="projects-list">
    <li
      class="projects-list-item"
      v-for="project in projects"
      :key="project.id">
      <div>
        <h6>{{ project.name_with_namespace }}</h6>
        <h6><a :href="project.web_url" target="_blank">Go to GitLab page</a></h6>
      </div>
      <div>
        <router-link :to="{ name: 'variables', params: { projectId: project.id } }">Edit variables</router-link>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProjectsList',
  props: {
      projects: Array,
  }
}
</script>

<style>
.projects-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.projects-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c5c9c6;
}
</style>