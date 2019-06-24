<template>
    <div v-if="project" class="projectDetails">
        <div v-if="editing === false">
            <div>Name: {{ project.name }}</div>
            <div>Description: {{ project.description }}</div>
            <div>Live Url{{ project.live_url }}</div>
            <div>Stage Url{{ project.stage_url }}</div>
            <ul>
                <li v-for="(field, i) in project.fields" :key="i">{{ field.key }}: {{ field.value }}</li>
            </ul>
        </div>
        <div v-if="editing === true">
            <input v-model="project.name">
            <input v-model="project.description">
            <input v-model="project.live_url">
            <input v-model="project.stage_url">
            <div @click="save">SAVE</div>
        </div>
        <div @click="toggleEditing">EDIT/CLOSE</div>

        //////////////////////////////////////////////////////////
        <div>
            <label for="">Key</label>
            <input type="text" v-model="newKey">
            <label for="">Value</label>
            <input type="text" v-model="newValue">
            <div @click="addField">save</div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: ['project'],
        data: function () {
            return {
                editing: false,
                newKey: '',
                newValue: ''
            }
        },
        methods: {
            ...mapActions(['updateProject', 'putField']),
            toggleEditing() {
                this.editing = !this.editing
            },
            async save() {
                await this.updateProject(this.project)
                this.editing = false
            },
            async addField() {
                await this.putField({
                    key: this.newKey,
                    value: this.newValue,
                    projectId: this.project.id
                })
                this.newKey = ''
                this.newValue = ''
            }
        }
    }
</script>