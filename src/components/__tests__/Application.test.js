import React from "react";
import axios from "axios";
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
    //Wait for initial get from API to render
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[0]
    //Add a new appointment by clicking 'add', inputting the student name, and selecting an interviewer
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"))
    //Check to confirm that the Status component is mounted with a message of 'saving'
    expect(getByText(appointment, "Saving")).toBeInTheDocument()

    //wait for the status component to be unmounted, and replaced with the Show component
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))
    expect(getByText(appointment, "Lydia Miller-Jones"))

    //check to make sure the number of appointments is incremented, and that 'no spots remaining' is shown
    const monday = getAllByTestId(container, "day")
    .find(day => queryByText(day, "Monday"))
    expect(getByText(monday, /no spots remaining/i)).toBeInTheDocument()
  })
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const {container} = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment,'Delete'))
    expect(getByText(appointment, /are you sure/i)).toBeInTheDocument()

    fireEvent.click(getByText(appointment, "Confirm"))
    expect(getByText(appointment, "Deleting")).toBeInTheDocument()

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"))
    expect(getByAltText(appointment, "Add"))

    const monday = getAllByTestId(container, "day")
    .find(day => queryByText(day, "Monday"))
    expect(getByText(monday, /2 spots remaining/i)).toBeInTheDocument()
  })
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const {container, debug} = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"))
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Barchie Bohen" }
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument()

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))
    expect(getByText(appointment, "Barchie Bohen")).toBeInTheDocument()
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument()

    const monday = getAllByTestId(container, "day")
    .find(day => queryByText(day, "Monday"))
    expect(getByText(monday, /1 spot remaining/i)).toBeInTheDocument()
  })
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const {container, debug} = render(<Application />)

    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"))
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))
    expect(getByText(appointment, "Error while saving interview")).toBeInTheDocument()
    fireEvent.click(getByAltText(appointment, "Close"))
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toBeInTheDocument()
  })
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const {container, debug} = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment,'Delete'))
    fireEvent.click(getByText(appointment, "Confirm"))
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"))
    expect(getByText(appointment, "Error while deleting interview")).toBeInTheDocument()
    fireEvent.click(getByAltText(appointment, "Close"))
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument()
  })
})