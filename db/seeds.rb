require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# t.string "title"
# t.string "description"
# t.integer "client_id"
# t.integer "victor_id"
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.float "lat"
# t.float "lng"
# lat: 41.3917,
# lng: 2.1649

Client.create username: 'liv', password: 'fish', password_confirmation: 'fish', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBTWFnjwIJFXgDdyzgSRjit2_9zlWrMVqgVg&usqp=CAU'
Client.create username: 'reed', password: 'fish', password_confirmation: 'fish', image_url: 'https://imgix.ranker.com/node_img/95/1898585/original/rex-reed-writers-photo-1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=150&w=150'

Professional.create username: 'arnold', password: 'fish', password_confirmation: 'fish', image_url: 'https://manofmany.com/wp-content/uploads/2019/03/Arnold-Schwarzeneggers-Diet-and-Workout-Plan.jpg'
Professional.create username: 'sebastian', password: 'fish', password_confirmation: 'fish', image_url: 'https://s.wsj.net/public/resources/images/BN-TW412_WOLFE_FR_20170614145651.jpg'
Professional.create username: 'maria', password: 'fish', password_confirmation: 'fish', image_url: 'https://www.tennisworldusa.org/imgb/98650/maria-sharapova-when-i-won-wimbledon-my-mother-was-.webp'



1.times do 

images = [{path: 'db/Pictures/wooden_pier_two.jpeg', filename:'wooden_pier_two.jpeg'}, {path:'db/Pictures/Wooden_Pier.jpeg',filename:'Wooden_Pier.jpeg'}, {path: 'db/Pictures/Wooden_Pier_3.jpeg', filename: 'Wooden_Pier_3.jpeg'}]
proposal = Proposal.create title: 'Fix my broken dock', description: 'Old style beach front pier in need of repair', client_id: Client.first.id, victor_id: nil, lat: Faker::Number.within(range: 41.3917..41.4000), lng: Faker::Number.within(range: 2.1649..2.2000) 

images.each do |i|
    
post = proposal.posts.create title: "Doc"
# attach a local image as a placeholder
post.image.attach(io: File.open(Rails.root.join(i[:path])),
                  filename: i[:filename])
end
 
proposal.bids.create professional_id: Professional.first.id, amount: 400


end