import React from "react";
import {render, screen} from "@testing-library/react"
import TaskList from "./TaskList"
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

    it("renders without a predefined list of tasks", () => {
        render(<TaskList onEditTask={() => {
        }} onDeleteTask={() => {
        }}/>);

        const taskItems = screen.queryAllByRole("listitem");
        expect(taskItems).toHaveLength(0);
    });

    it("renders with a predefined list of tasks", () => {
        render(<TaskList tasks={tasks} onEditTask={() => {
        }} onDeleteTask={() => {
        }}/>);

        const taskItems = screen.getAllByRole("listitem");
        expect(taskItems).toHaveLength(tasks.length);
    });

    it("toggles edit mode", async () => {
        render(<TaskList tasks={tasks} onEditTask={() => {
        }} onDeleteTask={() => {
        }}/>);

        const index = 0;

        expect(screen.queryAllByTestId(id => id.startsWith("button-edit-"))).toHaveLength(3);
        expect(screen.queryAllByTestId(id => id.startsWith("button-save-"))).toHaveLength(0);
        expect(screen.queryAllByTestId(id => id.startsWith("button-cancel-"))).toHaveLength(0);

        expect(screen.queryByTestId(`button-save-${index}`)).toBeNull;
        await userEvent.click(screen.getByTestId(`button-edit-${index}`));

        expect(screen.queryAllByTestId(id => id.startsWith("button-edit-"))).toHaveLength(2);
        expect(screen.queryAllByTestId(id => id.startsWith("button-save-"))).toHaveLength(1);
        expect(screen.queryAllByTestId(id => id.startsWith("button-cancel-"))).toHaveLength(1);

        expect(screen.queryByTestId(`button-edit-${index}`)).toBeNull;
        screen.getByTestId(`button-save-${index}`);
    });
});