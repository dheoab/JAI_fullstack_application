<script>
import { mapActions } from 'pinia'
import { useMainStore } from '../stores/mainStore'


export default {
  name: 'LoginView',
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions(useMainStore, ['loginHandler']),
  }
}
</script>

<template>
  <div class="d-flex flex-column justify-content-center p-3 m-3">
    <div class="row m-5 justify-content-center">
      <div class="col-8">
        <div class="row d-flex flex-row justify-content-center">
          <h3 class="col-12 text-center">Login</h3>
          <div class="col-6 d-flex flex-column justify-content-center bg-light p-3 rounded-3 shadow mt-3">
            <form class="login-form">
              <div>
                <div class="p-2">
                  <label for="">Email<span class="text-danger text-end fw-bold"> *</span></label>
                </div>
                <div>
                  <input v-model="this.loginData.email" class="w-100 form-control" type="email" placeholder="Email">
                </div>
              </div>

              <div>
                <div class="p-2">
                  <label for="">Password<span class="text-danger text-end fw-bold"> *</span></label>
                </div>
                <div>
                  <input v-model="this.loginData.password" class="w-100 form-control" type="password"
                    placeholder="Password">
                </div>
              </div>

              <div class="mt-4 d-grid gap-2">
                <button @click.prevent="loginHandler(this.loginData)" type="submit"
                  class="btn btn-success btn-block">Login</button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

