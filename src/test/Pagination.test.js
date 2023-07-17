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

    it("Check if paginaton buttons works correctly", async () => {
        const PrevButton = wrapper.find("#PaginationButtonPrev");
        const NextButton = wrapper.find("#PaginationButtonNext");

        store.state.pageData.currentPage = 1;
        await NextButton.trigger("click");
        expect(store.state.pageData.currentPage).toBe(2);

        await PrevButton.trigger("click");
        expect(store.state.pageData.currentPage).toBe(1);
    });

    it("Check if going forward from the last page is disabled", async () => {
        const NextButton = wrapper.find("#PaginationButtonNext");
        
        store.state.pageData.currentPage = 3;
        await NextButton.trigger("click");
        expect(store.state.pageData.currentPage).toBe(3);
    });

    it("Check if going back from the first page is disabled", async () => {
        const PrevButton = wrapper.find("#PaginationButtonPrev");

        store.state.pageData.currentPage = 1;
        await PrevButton.trigger("click");
        expect(store.state.pageData.currentPage).toBe(1);
    });

    it("Check if the pages are calculated correctly", async () => {
        await wrapper.vm.$store.commit("pageData/setCurrentPage", 1);
        await wrapper.vm.$store.commit("pageData/setPostsPerPage", 6);
        await wrapper.vm.$store.commit("pageData/setTotalPosts", 12);

        expect(wrapper.html()).toContain("1");
        expect(wrapper.html()).toContain("/ 2");

    });
});