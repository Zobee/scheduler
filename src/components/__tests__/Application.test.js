import React from "react";

import { 
  render, 
  cleanup,
  waitForElement, 
  fireEvent, 
  getByText,
  waitForElementToBeRemoved, 
  prettyDOM, 
  queryByText,
  getAllByTestId, 
  getByAltText, 
  getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    try{    
      await waitForElement(() => getByText("Monday"))
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument()
    } catch (error) {
      console.log("error", error)
    }
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const {container, debug} = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
    //console.log(prettyDOM(container))
    const appointments = getAllByTestId(container, "appointment")
    //console.log(prettyDOM(appointments))
    const appointment = appointments[0]
    //console.log(prettyDOM(appointment))
    fireEvent.click(getByAltText(appointment, "Add"));
    //console.log("AFTER CLICK EVENT")
    //console.log(prettyDOM(appointment))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    })
    // console.log("AFTER INPUT")
    // console.log(prettyDOM(appointment))
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"))
    // console.log("AFTER SAVE")
    // console.log(prettyDOM(appointment));
    //debug(appointment)
    expect(getByText(appointment, "Saving")).toBeInTheDocument()

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))
    expect(getByText(appointment, "Lydia Miller-Jones"))
    //debug(appointment)
    const monday = getAllByTestId(container, "day")
    .find(day => queryByText(day, "Monday"))
    //debug(monday)
    expect(getByText(monday, /no spots remaining/i)).toBeInTheDocument()
  })
})