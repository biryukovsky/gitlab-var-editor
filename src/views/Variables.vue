<template>
  <header class="navbar">
    <section class="navbar-section">
      <div class="columns navbar-inner">
        <div class="column col-2 navbar-inner-column">
          <router-link :to="{ name: 'home' }" class="btn btn-link">
            <i class="icon icon-back"></i> Back to projects
          </router-link>
        </div>
        <div
          class="column col-10 navbar-inner-column"
          v-if="projectData !== null"
        >
          <h5 class="project-name">{{ projectData.name_with_namespace }}</h5>
        </div>
      </div>
    </section>
  </header>
  <div class="columns col-oneline buttons">
    <div class="column col-2">
      <select class="form-select" @change="onScopeChange">
        <option
          :selected="scope == env"
          v-for="(env, idx) in scopesList"
          :key="idx"
          :value="env"
        >
          {{ env }}
        </option>
      </select>
    </div>
    <div class="column col-2">
      <button class="btn" @click="addScope">Add Scope</button>
    </div>
    <div class="column col-2">
      <button class="btn" @click="addVariable">Add Variable</button>
    </div>
  </div>
  <div class="columns">
    <div class="column col-4 var-heading"><b>Name</b></div>
    <div class="column col-5 var-heading"><b>Value</b></div>
    <div class="column col-3 var-heading"><b>Actions</b></div>
  </div>
  <div
    class="columns variable-row"
    v-for="(variable, idx) in varList"
    :key="idx"
  >
    <div class="column col-4 text-center">{{ variable.key }}</div>
    <div class="column col-5">
      <textarea
        class="variable-value"
        rows="5"
        v-model="variable.value"
      ></textarea>
    </div>
    <div class="column col-3 columns">
      <div class="column text-center">
        <button class="btn btn-success mr-1" @click="updateVariable(variable)">Update</button>
        <button class="btn btn-error ml-1">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api";

export default {
  props: {
    projectId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      scopesList: [],
      projectData: null,
      variablesByScope: {},
    };
  },

  computed: {
    scope() {
      return this.$route.query.scope || "*";
    },
    varList() {
      return this.variablesByScope[this.scope];
    },
  },

  watch: {
    scope(newVal) {
      this.$router.push({ query: { ...this.$route.query, scope: newVal } });
    },
  },

  methods: {
    onScopeChange(scope) {
      const val = scope.target.value;
      this.$router.push({
        query: { ...this.$route.query, scope: val },
      });
    },

    async addVariable() {},
    async deleteVariable() {},
    async updateVariable(variable) {
        const newVar = await api.updateVariable(this.projectId, variable.key, variable.value);
        // console.log(newVar);
        variable.value = newVar.value;
    },
    async addScope() {
      const name = "staging";
    },

    async getProjectInfo() {
      const data = await api.getProject(this.projectId);
      this.projectData = data;
    },
    async getVariablesList() {
      const variables = await api.getProjectVariables(this.projectId);

      // TODO: sort variables inside scopes
      for (let v of variables) {
        this.variablesByScope[v.environment_scope] =
          this.variablesByScope[v.environment_scope] || [];
        this.variablesByScope[v.environment_scope].push(v);
      }
      this.scopesList = Object.keys(this.variablesByScope).sort();
    },
  },
  async mounted() {
    await this.getVariablesList();
    await this.getProjectInfo();
  },
};
</script>

<style scoped>
.navbar-inner {
  width: 100%;
}

.actions-column,
.navbar-inner-column {
  display: flex;
  align-items: center;
}

.variable-row {
  margin-bottom: 1em;
}

.project-name {
  margin-bottom: 0;
}

.scopes-list {
  padding: 1.5em 0;
}

.variable-value {
  resize: vertical;
  width: 100%;
  font-size: 0.9em;
  font-family: monospace;
  padding: 5px;
}

.var-heading {
  padding: 10px 0;
  text-align: center;
}

.action-btn {
  width: 100%;
}
</style>
