import json

data = [
  {
    "productId": 0,
    "name": "Milk Chocolate Biscuits 9 Pack",
    "price": 1.5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 1,
    "name": "Cookie Dough Vanilla Ice Cream 465Ml",
    "price": 4.5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 2,
    "name": "Sparkling Water 330Ml",
    "price": 2.5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 3,
    "name": "Diced Beef 600G",
    "price": 4.9,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 4,
    "name": "Kitchen Towel 200 Sheets",
    "price": 2.5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 5,
    "name": "Multipack Crisps 24 X 25G",
    "price": 3,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 6,
    "name": "Dairy Milk Chocolate Bar 110G",
    "price": 0.98,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 7,
    "name": "Granulated Sugar 1Kg",
    "price": 0.65,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 8,
    "name": "Sour Cream & Onion Crisps 200G",
    "price": 2.5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 9,
    "name": "Large Free Range Eggs 12 Pack",
    "price": 2.05,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer A"
  },
  {
    "productId": 10,
    "name": "Beef Mince 5% Fat 500g ",
    "price": 2.6,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 11,
    "name": "Chicken Breast Fillets 640g ",
    "price": 3.6,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 12,
    "name": "King Prawns 150g ",
    "price": 3,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 13,
    "name": "Chicken Thigh Fillets 640g ",
    "price": 3.2,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 14,
    "name": "British Extra Lean Diced Beef 250g ",
    "price": 2.5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 15,
    "name": "Fairtrade Bananas x5 ",
    "price": 0.8,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 16,
    "name": "British Semi Skimmed Milk 2.27L (4 pint)",
    "price": 1.1,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 17,
    "name": "British Whole Milk 2.27L (4 pint)",
    "price": 1.1,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 18,
    "name": "Whole Milk 2L",
    "price": 1.6,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 19,
    "name": "White Granulated Sugar 1kg ",
    "price": 0.75,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer B"
  },
  {
    "productId": 20,
    "name": "Smoked Salmon",
    "price": 5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  },
  {
    "productId": 21,
    "name": "Seedless Grape Selection",
    "price": 2.3,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  },
  {
    "productId": 22,
    "name": "Essential British Chicken Mini Breast Fillets",
    "price": 3.5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  },
  {
    "productId": 23,
    "name": "Semi Skimmed Milk",
    "price": 0.89,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  },
  {
    "productId": 24,
    "name": "Large Eggs",
    "price": 3.5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  },
  {
    "productId": 25,
    "name": "Beef rump steak",
    "price": 4,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  },
  {
    "productId": 26,
    "name": "Beef Sirloin Steak",
    "price": 4.5,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  },
  {
    "productId": 27,
    "name": "Lean Diced British Beef Braising Steak",
    "price": 4.25,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  },
  {
    "productId": 28,
    "name": "2 Raw Lobster Tails",
    "price": 20,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  },
  {
    "productId": 29,
    "name": "Tomato Ketchup",
    "price": 1.75,
    "image": "mockImageUrl",
    "retailer": "Mock Retailer C"
  }
]

output = []

for i in range(len(data)):
    output.append({
        "model": "product.ProductDB",
        "pk": i+1,
        "fields": {
            "name": data[i]["name"],
            "price": data[i]["price"],
            "image": data[i]["image"],
            "retailer": data[i]["retailer"]
        }
    })

with open('MockSupermarketDataset_DjangoFixture.json', 'w') as outfile:
    json.dump(output, outfile)

