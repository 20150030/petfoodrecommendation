import csv
import sqlite3
from pathlib import Path

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except sqlite3.Error as e:
        print(e)
    return conn

def create_table(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except sqlite3.Error as e:
        print(e)

def insert_food_data(conn, food):
    sql = '''INSERT INTO foods(name, price, rating, image_url, category, details)
             VALUES(?,?,?,?,?,?)'''
    cur = conn.cursor()
    cur.execute(sql, food)
    return cur.lastrowid

def main():
    database = Path("petfood.db")
    
    sql_create_foods_table = """ CREATE TABLE IF NOT EXISTS foods (
                                    id integer PRIMARY KEY,
                                    name text NOT NULL,
                                    price text,
                                    rating real,
                                    image_url text,
                                    category text,
                                    details text
                                ); """
    
    conn = create_connection(database)
    
    if conn is not None:
        create_table(conn, sql_create_foods_table)
    else:
        print("Error! cannot create the database connection.")
        return

    cat_food_file = Path("coupang_products_cat.csv")
    dog_food_file = Path("coupang_products_dog.csv")
    
    for file in [cat_food_file, dog_food_file]:
        print(file)
        with open(file, 'r', encoding='utf-8') as csvfile:
            csv_reader = csv.DictReader(csvfile)
            for row in csv_reader:
                print(row)
                food = (row['\ufeffname'], row['price'], row['rating'], row['image_url'], row['category'], row['details'])
                insert_food_data(conn, food)
    
    conn.commit()
    conn.close()

    print("Data has been successfully imported into the SQLite database.")

if __name__ == '__main__':
    main()
