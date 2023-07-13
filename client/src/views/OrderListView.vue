<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/mainStore';
import Navbar from '../components/Navbar.vue'

export default {
    name: "orderList",
    components: {
        Navbar
    },
    computed: {
        ...mapState(useMainStore, ['orderList'])
    },
    methods: {
        ...mapActions(useMainStore, ['fetchOrderList']),
        formatDate(dateString) {

            const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];

            const dateObject = new Date(dateString);

            const day = dateObject.getUTCDate();
            const monthIndex = dateObject.getUTCMonth();
            const year = dateObject.getUTCFullYear();


            const formattedDate = `${day} ${months[monthIndex]} ${year}`;

            return formattedDate;
        },
        formatCurrency(price) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(price);
        }

    },
    created() {
        this.fetchOrderList()
    }
}

</script>

<template>
    <Navbar />
    <div class="d-flex flex-column justify-content-center p-3 m-3">
        <div class="row m-5 justify-content-center">
            <div class="col-8">
                <div class="row d-flex flex-row justify-content-center">
                    <h3 class="col-12 text-center">Transaction List</h3>
                    <div class="col-12 d-flex flex-column justify-content-center bg-light p-3 rounded-3 shadow mt-3">
                        <template v-if="orderList.length === 0">
                            <div class="d-flex justify-content-center">
                                <h4>No Transaction History</h4>
                            </div>
                        </template>
                        <template v-else="orderList.length !== 0">
                            <table class="table align-middle">
                                <thead>
                                    <th>No</th>
                                    <th>Product Name</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total Price</th>
                                    <th>Order Date</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in orderList" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ order.productName }}</td>
                                        <td>{{ order.productQuantity }}</td>
                                        <td>{{ formatCurrency(order.price) }}</td>
                                        <td>{{ formatCurrency(order.price * order.productQuantity) }}</td>
                                        <td>{{ formatDate(order.createdAt) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </template>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>