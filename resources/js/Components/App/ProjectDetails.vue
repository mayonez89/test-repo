<template>
    <div v-if="project" class="projectDetails">
        <div v-if="editing === false">
            <div>Name: {{ project.name }}</div>
            <div>Description: {{ project.description }}</div>
            <div>Live Url{{ project.live_url }}</div>
            <div>Stage Url{{ project.stage_url }}</div>
        </div>
        <div v-if="editing === true">
            <input v-model="project.name">
            <input v-model="project.description">
            <input v-model="project.live_url">
            <input v-model="project.stage_url">
            <div @click="save">SAVE</div>
        </div>
        <div @click="toggleEditing">EDIT/CLOSE</div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: ['project'],
        data: function () {
            return {
                editing: false
            }
        },
        methods: {
            ...mapActions(['updateProject']),
            toggleEditing() {
                this.editing = !this.editing
            },
            async save() {
                await this.updateProject(this.project)
                this.editing = false
            }
        }
    }
</script>