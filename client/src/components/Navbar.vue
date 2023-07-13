<script>
import { mapActions, mapState } from 'pinia';
import { RouterLink, RouterView } from 'vue-router'
import { useMainStore } from '../stores/mainStore'

export default {
    name: 'Navbar',
    computed: {
        ...mapState(useMainStore, ['loginStatus'])
    },
    methods: {
        ...mapActions(useMainStore, ['logoutHandler', 'fetchOrderList', 'login']),
    },
    created() {
        this.login()
    }
}
</script>

<template>
    <nav class="navbar bg-body-tertiary w-auto sticky-top shadow-sm">
        <div class="container-fluid">
            <div>
                <RouterLink to="/orderlist" class="navbar-brand ps-3"><button @click.prevent="fetchOrderList"
                        class="btn btn-md btn-outline-success">My
                        Transaction</button></RouterLink>
                <RouterLink to="/order"><button class="btn btn-md btn-outline-success">Order</button></RouterLink>
            </div>




            <div class="d-flex flex-row">
                <div class="d-flex me-2" v-if="this.loginStatus === true">
                    <RouterLink to="/"><button class="btn btn-md btn-outline-danger" @click.prevent="logoutHandler">Log
                            Out</button></RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<style></style>