import {expect, test} from "vitest";
import Pagination from "../components/Pagination.vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Store from "../store/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Pagination functionality with modified store", async () => {
    let store = Store;

    store.state.pageData.currentPage = 2;
    store.state.pageData.postsPerPage = 6;
    store.state.pageData.totalPosts = 18;

    expect(Pagination).toBeTruthy(); // Pagination is defined
    const wrapper = mount(Pagination, {
        store: Store,
    });

    expect(wrapper).toBeTruthy(); // Pagination is mounted

    it("Is Everything Rendered right", () => {
        //check if the component is rendered
        expect(wrapper.html()).toContain("Pagination");
        expect(wrapper.html()).toContain("2");
        expect(wrapper.html()).toContain("/ 3");
    });

    it("Functionality", async () => {
        const PrevButton = wrapper.find("#PaginationButtonPrev");
        const NextButton = wrapper.find("#PaginationButtonNext");

        //check if the nextPage function is called
        await PrevButton.trigger("click");
        expect(store.state.pageData.currentPage).toBe(1);

        await NextButton.trigger("click");
        expect(store.state.pageData.currentPage).toBe(2);

        store.state.pageData.currentPage = 3;
        await NextButton.trigger("click");
        expect(store.state.pageData.currentPage).toBe(3);
    });

});