import crypto from "node:crypto";
import z from "zod";

import prismaClient from "../utils/prismaClient.mjs";

const EXPIRES_1WEEK = 7;
const EXPIRES_1MONTH = 30;

const productSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  createdDate: z.date().optional(),
});

export default class ProductController {
  async destroy(request, response) {
    const { id } = request.params;

    try {
      await prismaClient.product.delete({ where: { id } });

      response.status(204).send();
    } catch (error) {
      response.status(404).send({ message: "product not found." });
    }
  }

  async getOne(request, response) {
    const { id } = request.params;

    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      return response.status(404).send({ message: "product not found." });
    }

    response.send(product);
  }

  async index(request, response) {
    let { page = 1, pageSize = 20, filter='' } = request.query;
    const loggedUser = request.logged_user;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const skip = (page - 1) * pageSize;
    console.log(loggedUser);
    const [productTotalCount, products] = await Promise.all([
      prismaClient.product.count(),
      prismaClient.product.findMany({
        // take: pageSize,
        // skip,
        where: { userId: loggedUser?.id, name: { contains:filter }  },
      }),
    ]);

    response.send({
      page,
      pageSize,
      totalCount: productTotalCount,
      items: products,
    });
  }

  async store(request, response) {
    const loggedUser = request.logged_user;
    const product = request.body;

    const { success, data, error } = productSchema.safeParse(product);

    if (!success) {
      return response.status(400).send(error);
    }

    const newproduct = await prismaClient.product.create({
      data: {
        ...data,
        ...(loggedUser && {
          user: {
            connect: { id: loggedUser?.id },
          },
        }),
      },
      include: { user: true },
    });

    if (newproduct.user) {
      delete newproduct.user.password;
    }

    response.send({ message: "store", data: newproduct });
  }

  async update(request, response) {
    const { id } = request.params;
    const { description } = request.body;

    await prismaClient.product.update({
      data: { description },
      where: { id },
    });

    response.send({ message: "product Updated" });
  }
}
