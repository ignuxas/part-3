import {expect, test} from "vitest";
import Pagination from "../components/Pagination.vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Store from "../store/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

test("Pagination functionality with modified store", async () => {
    let store = Store;

    store.state.pageData.currentPage = 2;
    store.state.pageData.postsPerPage = 6;
    store.state.pageData.totalPosts = 18;

    expect(Pagination).toBeTruthy(); // Pagination is defined
    const wrapper = mount(Pagination, {
        store: Store,
    });

    expect(wrapper).toBeTruthy(); // Pagination is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Pagination");

    //check if the nextPage function is called
    await wrapper.find("#PaginationButtonPrev").trigger("click");
    expect(store.state.pageData.currentPage).toBe(1);

    await wrapper.find("#PaginationButtonNext").trigger("click");
    expect(store.state.pageData.currentPage).toBe(2);
});