Feature: Donate
  In order to be able to donate
  As an anonymous user
  We need to be able to see the donations options.

  @javascript
  Scenario: Visit the homepage
    Given I am an anonymous user
    When  I am on the homepage
    And   I wait for the page
    And   I click "Donate Now"
    Then  I wait for options
    And   I should see "Donation of $100"
