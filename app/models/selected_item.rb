class SelectedItem < ActiveRecord::Base
  belongs_to :menu
  belongs_to :menu_item
  scope :for_menus, ->{ where(type: 'MenuSelectedItem') }
  scope :for_users, ->{ where(type: 'UserSelectedItem') }
end
