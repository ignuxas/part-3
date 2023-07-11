import { mount } from "@vue/test-utils";
//import HelloWorld from "../components/HelloWorld.vue";
import { expect, test} from "vitest";
import Search from "../components/Search.vue";

test("Search functionality", async () => {
    expect(Search).toBeTruthy(); // MutateWindow is defined
    let searchCalled = false;
    const wrapper = mount(Search, {
        methods: {
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