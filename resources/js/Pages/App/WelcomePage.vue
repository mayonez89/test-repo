<template>
    <div>
        <div class="projectsList">
            <ul>
                <li v-for="(project, i) in projects" :key="i">
                    <div @click="activateProject(project)">{{ project.name }}</div>
                </li>
            </ul>
        </div>
        <div>
            <div v-if="activeProject" @click="deactivateProject">close details</div>
            <project-details :project="activeProject"></project-details>
        </div>

    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import ProjectDetails from '@/Components/App/ProjectDetails.vue'

    export default {
        components: {
            ProjectDetails
        },
        data: function() {
            return {
                activeProject: null
            }
        },
        mounted() {
            this.fetchProjects()
        },
        computed: {
            ...mapGetters(['projects'])
        },
        methods: {
            ...mapActions(['fetchProjects']),
            activateProject(project) {
                this.activeProject = _.clone(project)
            },
            deactivateProject() {
                this.activeProject = false
            }
        }
    }
</script>
