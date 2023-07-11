import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import Status from "../components/Status.vue";

test("Status functionality (200)", async () => {
    expect(Status).toBeTruthy(); // Status is defined
    
    const wrapper = mount(Status, {
        data(){
            return {
                status: 200,
                hidden: false,
            };
        },
    });
    expect(wrapper).toBeTruthy(); // Status is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Status");

    // check
    expect(wrapper.find("#StatusContainer").element.className).toBe("success");
    expect(wrapper.find("#StatusContainer").element.hidden).toBe(false);
    expect(wrapper.find("h1").element.textContent).toBe("Success");
})

test("Status functionality (404)", async () => {
    expect(Status).toBeTruthy(); // Status is defined
    
    const wrapper = mount(Status, {
        data(){
            return {
                status: 404,
                hidden: false,
            };
        },
    });
    expect(wrapper).toBeTruthy(); // Status is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Status");

    // check
    expect(wrapper.find("#StatusContainer").element.className).toBe("");
    expect(wrapper.find("#StatusContainer").element.hidden).toBe(false);
    expect(wrapper.find("h1").element.textContent).toBe("Article not found");
})

test("Status functionality (500)", async () => {
    expect(Status).toBeTruthy(); // Status is defined
    
    const wrapper = mount(Status, {
        data(){
            return {
                status: 500,
                hidden: false,
            };
        },
    });
    expect(wrapper).toBeTruthy(); // Status is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Status");

    // check
    expect(wrapper.find("#StatusContainer").element.className).toBe("");
    expect(wrapper.find("#StatusContainer").element.hidden).toBe(false);
    expect(wrapper.find("h1").element.textContent).toBe("Server error");
})

test("Status functionality (69)", async () => {
    expect(Status).toBeTruthy(); // Status is defined
    
    const wrapper = mount(Status, {
        data(){
            return {
                status: 69,
                hidden: false,
            };
        },
    });
    expect(wrapper).toBeTruthy(); // Status is mounted

    //check if the component is rendered
    expect(wrapper.html()).toContain("Status");

    // check
    expect(wrapper.find("#StatusContainer").element.className).toBe("");
    expect(wrapper.find("#StatusContainer").element.hidden).toBe(false);
    expect(wrapper.find("h1").element.textContent).toBe("Unknown error");
})
