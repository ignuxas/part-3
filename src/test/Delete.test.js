import { describe, expect, it, test} from "vitest";
import Delete from "../components/Delete.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

import Store from "../store/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Delete rendered", async () => {
    expect(Delete).toBeTruthy(); // Delete is defined
    expect(Store).toBeTruthy(); // Store is defined

    const wrapper = shallowMount(Delete, {
        store: Store,
    });

    wrapper.vm.$store.state.postData.id = 1;
    const id = wrapper.vm.$store.state.postData.id;
    wrapper.vm.$store.state.postData.currentPostId = 1;


    expect(wrapper).toBeTruthy(); // Delete is mounted

    it("Is Everything Rendered right", () => {
        //check if the component is rendered
        expect(wrapper.html()).toContain("ConfirmContainer");

        //check if the delete ID: text is the same as the one in the store
        expect(wrapper.find("p").text()).toBe("ID: " + id);
    });
});