Feature: Donate
  In order to be able to donate
  As an anonymous user
  We need to be able to see the donations options.

  @javascript
  Scenario: Visit the homepage
    Given I am an anonymous user
    When  I visit the homepage
    And   I follow "Donate Now"
    And   I should see "Donation of $100" as option.
