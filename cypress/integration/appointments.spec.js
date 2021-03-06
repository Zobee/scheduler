describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/")
    cy.contains("Monday");
  })
  xit("should book an interview", () => {
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

  xit("should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({force: true})
    cy.get('[data-testid=student-name-input]').clear().type("Frank Frankson")
    cy.get("[alt='Tori Malcolm']").click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Frank Frankson");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an interview", () => {
    //Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
    .first()
    .click({force: true})
    //Clicks the confirm button
    cy.contains("Confirm").click()
    //Sees that the appointment slot is empty
    cy.contains("Deleting").should('not.exist')
    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist')
  })
})