import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Bind,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('produits')
@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @ApiResponse({ status: 201, description: 'produit posté' })
  @Post()
  async create(@Body() createProduitDto: CreateProduitDto) {
    const product = await this.produitsService.create(createProduitDto);

    return {
      statuscode: 201,
      message: 'Produit posté !',
      data: product,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'Voici tout les produits enregistrés',
  })
  @Get()
  async findAll() {
    const allProduct = await this.produitsService.findAll();

    return {
      statuscode: 200,
      message: 'Voici tout les produits enregistrés',
      data: allProduct,
    };
  }

  @ApiResponse({
    status: 201,
    description: 'Le produit à bien été modifié ',
  })
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(
    @Param('id') id: string,
    @Body() updateProduitDto: UpdateProduitDto,
  ) {
    const isExist = await this.produitsService.findOne(+id);

    if (!isExist) throw new NotFoundException("Ce produit n'éxiste pas.");

    const updateProduct = await this.produitsService.update(
      +id,
      updateProduitDto,
      isExist,
    );

    return {
      statuscode: 201,
      message: `Le produit n°${id} à bien été modifié`,
      data: updateProduct,
    };
  }

  @ApiResponse({
    status: 201,
    description: 'Le produit à bien été supprimé ',
  })
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: string) {
    const isExist = await this.produitsService.findOne(+id);

    if (!isExist) throw new NotFoundException("Ce produit n'éxiste pas.");

    this.produitsService.remove(isExist);

    return {
      statuscode: 201,
      message: `Le produit n°${id} à bien été supprimé`,
    };
  }
}
