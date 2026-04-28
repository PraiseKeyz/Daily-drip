
import { Controller, Get, Post, Body, UseGuards, Param, Request } from '@nestjs/common';
import { EnvelopesService } from './envelopes.service';
import { CreateEnvelopeDto } from './dto/create-envelope.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { EmailVerifiedGuard } from '../../common/guards/email-verified.guard';

@UseGuards(JwtAuthGuard, EmailVerifiedGuard)
@Controller('envelopes')
export class EnvelopesController {
    constructor(private readonly envelopesService: EnvelopesService) { }

    @Post()
    create(@Request() req, @Body() createEnvelopeDto: CreateEnvelopeDto) {
        return this.envelopesService.create(req.user.userId, createEnvelopeDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.envelopesService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.envelopesService.findOne(id, req.user.userId);
    }
}
