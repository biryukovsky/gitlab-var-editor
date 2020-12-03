<template>
  <div class="home">
    <header class="navbar">
      <section class="navbar-section">
        <div class="input-group input-inline">
          <input class="form-input" type="text" placeholder="search project">
          <button class="btn btn-primary input-group-btn">Search</button>
        </div>
      </section>
    </header>
    <ProjectsList :projects="projects"/>
    <div class="load-button-container">
      <div v-if="loading" class="loading loading-lg"></div>
      <button
        class="btn btn-primary"
        v-if="!allProjectsLoaded && !loading"
        @click="getProjectsList"
      >
        Load more
      </button>
    </div>
  </div>
</template>

<script>
import { getProjects } from "@/api";
import ProjectsList from '@/components/ProjectsList.vue';

export default {
    name: 'Home',
    data() {
        return {
            projects: [],
            page: 1,
            allProjectsLoaded: false,
            loading: false,
        }
    },
    components: {
      ProjectsList,
    },
    methods: {
        async getProjectsList() {
            this.loading = true;
            const projects = await getProjects(this.page);
            this.projects.push(...projects);
            this.page += 1;
            this.allProjectsLoaded = projects.length === 0;
            this.loading = false;
        },
    },
    async mounted() {
        await this.getProjectsList();
    },
}
</script>

<style>
.navbar {
  padding: 10px 0;
}
.load-button-container {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
</style>