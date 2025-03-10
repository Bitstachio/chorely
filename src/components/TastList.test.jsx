import React from "react";
import {render, screen} from "@testing-library/react"
import TaskList from "./TaskList"
import {describe, expect, it} from "vitest";
import "@testing-library/jest-dom/vitest"

describe("TaskList", () => {
    it("renders without crashing", () => {
        render(<TaskList/>);
    });
});