from locust import HttpUser, task, between
import random

class ProductUser(HttpUser):
    wait_time = between(1, 3)  # espera entre 1 y 3 segundos entre tareas

    @task(2)
    def get_products(self):
        self.client.get("/api/products")

    @task(1)
    def post_product(self):
        producto = {
            "name": f"Producto-{random.randint(1, 1000)}",
            "price": random.randint(10000, 100000),
            "stock": random.randint(1, 20),
            "category": "Test"
        }
        self.client.post("/api/products", json=producto)
