import React from "react";
import {render, screen} from "@testing-library/react"
import TaskManager from "./TaskManager.jsx";
import {describe, expect, it, beforeEach} from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest"

describe("TaskList", () => {
    let tasks;
    beforeEach(() => {
        document.body.innerHTML = "";
        tasks = [
            {description: "Task #1"},
            {description: "Task #2"},
            {description: "Task #3"}
        ];
    });

    it("creates a new task", async () => {
        render(<TaskManager initialTasks={tasks}/>);

        const newDescription = "Task #99";

        await userEvent.type(screen.getByTestId("input-new-description"), newDescription);
        await userEvent.click(screen.getByTestId("button-new-task"));

        expect(screen.queryAllByRole("listitem")).toHaveLength(tasks.length + 1);
        expect(screen.getByText(newDescription)).toBeInTheDocument();
    });

    it("does not create a new task if input field is empty", async () => {
        render(<TaskManager initialTasks={tasks}/>);

        await userEvent.type(screen.getByTestId("input-new-description"), " ");
        await userEvent.click(screen.getByTestId("button-new-task"));

        expect(screen.queryAllByRole("listitem")).toHaveLength(tasks.length);
    })

    it("updates task description", async () => {
        render(<TaskManager initialTasks={tasks}/>);

        const index = 0;
        const newDescription = "Task #99";

        await userEvent.click(screen.getByTestId(`button-edit-${index}`));
        const input = screen.getByTestId(`input-description-${index}`);
        await userEvent.clear(input);
        await userEvent.type(input, newDescription);
        await userEvent.click(screen.getByTestId(`button-save-${index}`));

        expect(screen.getByTestId(`p-description-${index}`)).toHaveTextContent(newDescription);
    });

    it("does not update task description if input field is empty", async () => {
        render(<TaskManager initialTasks={tasks}/>);

        const index = 0;
        const initialDescription = screen.getByTestId(`p-description-${index}`).textContent;

        await userEvent.click(screen.getByTestId(`button-edit-${index}`));
        const input = screen.getByTestId(`input-description-${index}`);
        await userEvent.clear(input);
        await userEvent.type(input, " ");
        await userEvent.click(screen.getByTestId(`button-save-${index}`));

        expect(screen.getByTestId(`p-description-${index}`)).toHaveTextContent(initialDescription);
    });

    it("cancels task description update", async () => {
        render(<TaskManager initialTasks={tasks}/>);

        const index = 0;
        const initialDescription = screen.getByTestId(`p-description-${index}`).textContent;
        const newDescription = "Task #99";

        await userEvent.click(screen.getByTestId(`button-edit-${index}`));
        let input = screen.getByTestId(`input-description-${index}`);
        await userEvent.clear(input);
        await userEvent.type(input, newDescription);
        await userEvent.click(screen.getByTestId(`button-cancel-${index}`));

        expect(screen.getByTestId(`p-description-${index}`)).toHaveTextContent(initialDescription);
    });

    it("deletes task", async () => {
        render(<TaskManager initialTasks={tasks}/>);

        const index = 0;
        const description = screen.getByTestId(`p-description-${index}`).textContent;

        await userEvent.click(screen.getByTestId(`button-delete-${index}`));

        expect(screen.queryAllByRole("listitem")).toHaveLength(tasks.length - 1);
        expect(screen.queryByText(description)).not.toBeInTheDocument();
    });

    it("deletes task when in edit mode", async () => {
        render(<TaskManager initialTasks={tasks}/>);

        const index = 0;
        const initialDescription = screen.getByTestId(`p-description-${index}`).textContent;
        const newDescription = "Task #99";


        await userEvent.click(screen.getByTestId(`button-edit-${index}`));
        const input = screen.getByTestId(`input-description-${index}`);
        await userEvent.clear(input);
        await userEvent.type(input, newDescription);
        await userEvent.click(screen.getByTestId(`button-delete-${index}`));

        expect(screen.queryAllByRole("listitem")).toHaveLength(tasks.length - 1);
        expect(screen.queryByText(initialDescription)).not.toBeInTheDocument();
        expect(screen.queryByText(newDescription)).not.toBeInTheDocument();
    });
});