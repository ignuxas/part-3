import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import Status from "../components/Status.vue";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Store from "../store/store.js";

const localVue = createLocalVue();
localVue.use(Vuex);

test("Status 200", async () => {
    expect(Status).toBeTruthy(); // Status is defined

    const wrapper = mount(Status, {
        store: Store,
    });

    // set the status to 200
    expect(wrapper).toBeTruthy(); // Status is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Status");

    expect(wrapper.find("#StatusContainer").element.className).toBe("hidden success");
    expect(wrapper.find("#StatusContainer").element.hidden).toBe(false);
    expect(wrapper.find("h1").element.textContent).toBe("Success");
})

test("Status 404", async () => {
    expect(Status).toBeTruthy(); // Status is defined

    let store = Store;

    store.state.mutateData.currentStatus = 404;

    const wrapper = mount(Status, {
        store: store,
    });

    // set the status to 404
    expect(wrapper).toBeTruthy(); // Status is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Status");

    expect(wrapper.find("#StatusContainer").element.className).toBe("hidden");
    expect(wrapper.find("#StatusContainer").element.hidden).toBe(false);
    expect(wrapper.find("h1").element.textContent).toBe("Article not found");
})

test("Status 500", async () => {
    expect(Status).toBeTruthy(); // Status is defined

    let store = Store;

    store.state.mutateData.currentStatus = 500;

    const wrapper = mount(Status, {
        store: store,
    });

    // set the status to 500
    expect(wrapper).toBeTruthy(); // Status is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Status");

    expect(wrapper.find("#StatusContainer").element.className).toBe("hidden");
    expect(wrapper.find("#StatusContainer").element.hidden).toBe(false);
    expect(wrapper.find("h1").element.textContent).toBe("Server error");
})