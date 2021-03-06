class User::MenusController < UserController
  def index
    menu = Menu.current
    serialized_menu = MenuSerializer.new(menu).as_json
    user_selected_items = current_user.find_or_create_selected_items(menu)
    serialized_selected_items = ActiveModel::ArraySerializer.new(user_selected_items)
    active_subscription = current_user.active_subscription.first
    response = {:menu => serialized_menu["menu"], :selected_items => serialized_selected_items}
    response[:meals_combo] = MealLimit.new(active_subscription.meals).combos if active_subscription.present?
    render :json => response
  end
end
