import { ref, computed } from "vue";
import router from "../router";
import { defineStore } from "pinia";
import axios from "axios";

const BASEURL = "http://localhost:3000";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    loginStatus: false,
    orderList: [],
  }),
  actions: {
    async loginHandler(loginData) {
      try {
        console.log(loginData, "loginData from Store");
        const { data } = await axios.post(`${BASEURL}/login`, loginData);

        console.log(data);
        this.loginStatus = true;

        console.log(this.loginStatus, "ini login Status");

        if (this.loginStatus) {
          Swal.fire("Logged in", "Logging in Succesfull", "success");
          localStorage.setItem("access_token", data.access_token);
          router.push("orderList");
        }
      } catch (error) {
        console.log(error, "ini console error login");
        Swal.fire("Login Failed", `${error.response.data.message}`, "error");
      }
    },

    login() {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        this.loginStatus = true;
      }
    },

    logoutHandler() {
      localStorage.clear();
      this.loginStatus = false;
      router.push("/");
      Swal.fire("Logged out", "Logging out Succesfull", "success");
    },
    async fetchOrderList() {
      console.log("fetchOrderList");

      const headers = {
        access_token: localStorage.getItem("access_token"),
      };

      const { data } = await axios.get(`${BASEURL}/order`, { headers });

      this.orderList = data.data;

      console.log(this.orderList, "data from FetchOrderList");

      router.push("/orderList");
      try {
      } catch (error) {
        console.log(error);
      }
    },

    async addOrder(newOrder) {
      try {
        console.log(newOrder, "newOrder from Store");
        const headers = {
          access_token: localStorage.getItem("access_token"),
        };

        const { data } = await axios.post(`${BASEURL}/order`, newOrder, {
          headers,
        });

        console.log(data);

        Swal.fire(
          "Order Success",
          `${data.data.productName} Ordered`,
          "success"
        );

        router.push("/orderList");
      } catch (error) {
        console.log(error.response.data.message);
        Swal.fire("Order Failed", `${error.response.data.message}`, "error");
      }
    },
  },
});
