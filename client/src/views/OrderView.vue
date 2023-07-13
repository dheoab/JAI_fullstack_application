<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/mainStore';
import Navbar from '../components/Navbar.vue';

export default {
  name: "OrderView",
  data() {
    return {
      newOrder: {
        productName: null,
        productQuantity: null,
        price: null
      }
    }
  },
  components: {
    Navbar
  },
  methods: {
    ...mapActions(useMainStore, ['addOrder'])
  }
}

</script>

<template>
  <Navbar />
  <div class="d-flex flex-column justify-content-center p-3 m-3">
    <div class="row m-5 justify-content-center">
      <div class="col-8">
        <div class="row d-flex flex-row justify-content-center">
          <h3 class="col-12 text-center">Order Item</h3>
          <div class="col-6 d-flex flex-column justify-content-center bg-light p-3 rounded-3 shadow mt-3">
            <form class="">
              <div>

                <div class="p-2">
                  <label for="">Product Name<span class="text-danger text-end fw-bold"> *</span></label>
                </div>
                <div>
                  <input v-model="this.newOrder.productName" class="w-100 form-control" type="text"
                    placeholder="Product Name">
                </div>
              </div>

              <div>
                <div class="p-2">
                  <label for="">Quantity<span class="text-danger text-end fw-bold"> *</span></label>
                </div>
                <div>
                  <input v-model="this.newOrder.productQuantity" class="w-100 form-control" type="number"
                    placeholder="Qty">
                </div>
              </div>

              <div>
                <div class="p-2">
                  <label for="">Price<span class="text-danger text-end fw-bold"> *</span></label>
                </div>
                <div>
                  <input v-model="this.newOrder.price" class="w-100 form-control" type="number" placeholder="Price">
                </div>
              </div>

              <div class="mt-4 d-grid gap-2">
                <button @click.prevent="this.addOrder(this.newOrder)" type="submit"
                  class="btn btn-success btn-block">Order</button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
