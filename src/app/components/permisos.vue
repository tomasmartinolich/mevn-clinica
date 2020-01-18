<template>
    <div>

    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    created() {
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login')
        }
    },
    methods: {

    }
}
</script>

