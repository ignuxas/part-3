import { mount, createLocalVue } from "@vue/test-utils";
import { expect, test} from "vitest";
import vuex from "vuex";
import Search from "../components/Search.vue";

import Store from "../store.js";

const localVue = createLocalVue();
localVue.use(vuex);

test("Search functionality", async () => {
    expect(Search).toBeTruthy(); // MutateWindow is defined
    let searchCalled = false;
    const wrapper = mount(Search, {
        methods: { // depricated in Vue 3
          search: () => {
            searchCalled = true;
          },
        },
    });

    expect(wrapper).toBeTruthy(); // MutateWindow is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Search");

    // expect the search method to be called
    await wrapper.find("button").trigger("click");
    expect(searchCalled).toBe(true);
})