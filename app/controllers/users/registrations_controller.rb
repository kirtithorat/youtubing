class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    # Create the user
    build_resource(sign_up_params)

    # Try to save them
    if resource.save
      render status: 200,
      json: {
        success: true, info: "Registered", data: {
          user: resource,
          auth_token: resource.authentication_token
        }
      }
    else
      # Otherwise fail
      render status: :unprocessable_entity,
      json: {
        success: false,
        info: resource.errors, data: {}
      }
    end
  end

end
