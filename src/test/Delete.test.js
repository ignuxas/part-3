import { expect, test} from "vitest";
import Delete from "../components/Delete.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

import Store from "../store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

test("Delete rendered", async () => {
    expect(Delete).toBeTruthy(); // Delete is defined
    expect(Store).toBeTruthy(); // Store is defined
  
    let store = Store;

    store.state.postData.id = 1;
    store.state.postData.currentPostId = 1;

    const wrapper = shallowMount(Delete, {
        store: Store,
    });

    expect(wrapper).toBeTruthy(); // Delete is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("ConfirmContainer");

    //check if the delete ID: text is the same as the one in the store
    expect(wrapper.find("p").text()).toBe("ID: " + store.state.postData.id);
});