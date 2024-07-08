import { getAllProducts } from "../dist/controllers/productControllers";
import { db } from "../dist/db/index.mjs";
import { Request, Response } from "express";
import jest from "jest"; // Only if you're using ES modules and need to explicitly import jest

jest.mock("../dist/db/index.mjs");

describe("getAllProducts", () => {
  const mockFind = jest.fn();
  const mockToArray = jest.fn();
  db.collection = jest.fn().mockReturnValue({ find: mockFind });
  mockFind.mockReturnValue({ toArray: mockToArray });

  const mockReq = {} as Request;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all products with status 200", async () => {
    const mockProducts = [{ name: "Product 1" }, { name: "Product 2" }];
    mockToArray.mockResolvedValue(mockProducts);

    await getAllProducts(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "All Products fetched",
      data: mockProducts,
    });
  });

  it("should return 404 if no products found", async () => {
    mockToArray.mockResolvedValue([]);

    await getAllProducts(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "Products Not Found",
    });
  });

  it("should handle errors with status 500", async () => {
    const errorMessage = "Error fetching products";
    mockToArray.mockRejectedValue(new Error(errorMessage));

    await getAllProducts(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ message: errorMessage });
  });
});
