describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/")
    cy.contains("Monday");
  })
  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
    .first()
    .click()
    // Enters their name
    cy.get('[data-testid=student-name-input]').type("Lydia Miller-Jones")
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click()
    // Clicks the save button
    cy.contains("Save").click()
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
    .click({force: true})
    cy.get('[data-testid=student-name-input]').clear().type("Frank Frankson")
    cy.get("[alt='Tori Malcolm']").click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Frank Frankson");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

//   it("should cancel an interview", () => {
//     /*
//     Visits the root of our web server
//     Clicks the delete button for the existing appointment
//     Clicks the confirm button
//     Sees that the appointment slot is empty
//     */
//   })
})