require 'rails_helper'
describe Admin::SubscriptionsController do
  context "#create" do
    let(:valid_attributes) { FactoryGirl.attributes_for :subscription }
    it "creates subscription if params are valid" do
      expect {
        post :create, :subscription => valid_attributes
      }.to change { Subscription.count }.by(1)
      expect(JSON.parse(response.body)["subscription"].keys).to eq(["id", "name", "description", "price"])
    end
    it "creates subscription if params are valid" do
      valid_attributes.delete(:description) # description is optional
      valid_attributes.delete valid_attributes.keys.sample #all other params are required
      expect {
        post :create, :subscription => valid_attributes
      }.to_not change { Subscription.count }
    end
  end
end
