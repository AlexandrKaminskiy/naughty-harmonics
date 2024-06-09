package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.dto.StaveDto;
import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import by.kamen.naughtyharmonicsbackend.service.PdfCreatorService;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PdfCreatorServiceImpl implements PdfCreatorService {

    private final CompositionService compositionService;
    private float height;
    private float width;
    private final double startTopOffset = 100;
    private final double rightOffset = 70;
    private final double noteOffset = 15;
    private final double offsetWithChangedTactSize = 50;
    private final double offsetWithoutChangedTactSize = 10;

    public PdfCreatorServiceImpl(CompositionService compositionService) throws IOException {
        this.compositionService = compositionService;


    }

    void configure(PdfCanvas canvas) {
        canvas.setLineWidth(10f);
    }

    void drawLine(PdfCanvas canvas, double x0, double y0, double x1, double y1) {
        canvas.saveState()
            .moveTo(x0, height - y0)
            .lineTo(x1, height - y1)
            .closePathStroke()
            .restoreState();
    }

    void drawDashedLine(PdfCanvas canvas, double x0, double y0, double x1, double y1) {
        canvas.saveState()
            .setLineDash(3f, 5f)
            .moveTo(x0, height - y0)
            .lineTo(x1, height - y1)
            .closePathStroke()
            .restoreState();
    }

    void drawText(PdfCanvas canvas, String text, double x0, double y0, int fontSize, PdfFont pdfFont) {
        canvas.saveState()
            .moveTo(x0, height - y0)
            .setFontAndSize(pdfFont, fontSize)
            .showText(text)
            .restoreState();
    }

    void drawLines(PdfCanvas canvas, double topOffset) {
        for (int i = 0; i < 6; i++) {
            drawLine(canvas, rightOffset, topOffset + i * 15, width - rightOffset, topOffset + i * 15);
        }
        drawLine(canvas, rightOffset, topOffset, rightOffset, topOffset + 15 * 5);
        drawLine(canvas, width - rightOffset, topOffset, width - rightOffset, topOffset + 15 * 5);
    }

    void drawImage(PdfCanvas canvas, float x0, float y0, ImageData image) {
        canvas.addImageAt(image, x0, height - y0, false);
    }

    void drawPause(PdfCanvas canvas, double x0, double y0, int pause) {
        switch (pause) {
            case 1 -> {
                return;
            }
            case 2 -> drawDashedLine(canvas, x0, y0, x0, y0 + 30);
            case 4 -> drawLine(canvas, x0, y0, x0, y0 + 30);
            case 8 -> {
                drawLine(canvas, x0, y0, x0, y0 + 30);
                drawLine(canvas, x0, y0 + 30, x0 + 10, y0 + 30);
            }
            case 16 -> {
                drawLine(canvas, x0, y0, x0, y0 + 30);
                drawLine(canvas, x0, y0 + 30, x0 + 10, y0 + 30);
                drawLine(canvas, x0, y0 + 25, x0 + 10, y0 + 25);
            }
            case 32 -> {
                drawLine(canvas, x0, y0, x0, y0 + 30);
                drawLine(canvas, x0, y0 + 30, x0 + 10, y0 + 30);
                drawLine(canvas, x0, y0 + 25, x0 + 10, y0 + 25);
                drawLine(canvas, x0, y0 + 20, x0 + 10, y0 + 20);
            }
        }
    }

    @Override
    public byte[] createFromComposition(Long id) throws IOException {

        Composition compositionModel = compositionService.findCompositionModel(id);
        List<StaveDto> staves = compositionModel.getStaves();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (PdfWriter docWriter = new PdfWriter(baos);
             PdfDocument pdfDocument = new PdfDocument(docWriter)) {

            ImageData data = ImageDataFactory.create("4.png");
            data.setWidth(15);
            data.setHeight(40);
            PdfFont customFont = PdfFontFactory.createFont(
                "ofont.ru_Times New Roman.ttf",
                PdfFontFactory.EmbeddingStrategy.FORCE_EMBEDDED
            );
            int k = 1;
            for (var staveDto : staves) {
                PdfPage page = pdfDocument.addNewPage();
                height = page.getPageSizeWithRotation().getHeight();
                width = page.getPageSizeWithRotation().getWidth();
                PdfCanvas canvas = new PdfCanvas(page);

                if (k == 1) {
                    float songNameWidth = customFont.getWidth(compositionModel.getName(), 30);
                    canvas.saveState()
                        .moveText((width - songNameWidth) / 2, height - 40)
                        .setFontAndSize(customFont, 30)
                        .showText(compositionModel.getName())
                        .restoreState();
                    canvas.saveState()
                        .moveText(rightOffset, height - 70)
                        .setFontAndSize(customFont, 10)
                        .showText("By " + compositionModel.getClient().getName())
                        .restoreState();
                    canvas.saveState()
                        .moveText(rightOffset, height - 83)
                        .setFontAndSize(customFont, 10)
                        .showText("Bpm " + compositionModel.getBpm())
                        .restoreState();
                }
                canvas.saveState()
                    .moveText(rightOffset, height - 96)
                    .setFontAndSize(customFont, 10)
                    .showText("Stave " + k)
                    .restoreState();

                double topOffset = startTopOffset;
                drawLines(canvas, topOffset);
                double currentOffset = rightOffset;

                for (int i = 0; i < staveDto.tacts().size(); i++) {

                    if (i == 0 ||
                        (!staveDto.tacts().get(i - 1).size().equals(staveDto.tacts().get(i).size()))) {
                        if (currentOffset + offsetWithChangedTactSize > width - rightOffset - offsetWithoutChangedTactSize) {
                            topOffset += (90 + 30);
                            currentOffset = rightOffset + offsetWithoutChangedTactSize;

                            if (topOffset + 90 > height) {
                                topOffset = startTopOffset;
                                page = pdfDocument.addNewPage();
                                height = page.getPageSizeWithRotation().getHeight();
                                width = page.getPageSizeWithRotation().getWidth();
                                canvas = new PdfCanvas(page);
                            }
                            drawLines(canvas, topOffset);

                        } else {
                            drawLine(
                                canvas,
                                currentOffset,
                                topOffset,
                                currentOffset,
                                topOffset + 5 * 15
                            );
                        }
                        currentOffset += offsetWithChangedTactSize;
                        drawText(
                            canvas,
                            staveDto.tacts().get(i).size().split("/")[0],
                            currentOffset - 30,
                            topOffset + 35,
                            40,
                            customFont
                        );
                        drawText(
                            canvas,
                            staveDto.tacts().get(i).size().split("/")[1],
                            currentOffset - 30,
                            topOffset + 65,
                            40,
                            customFont
                        );
                    } else {
                        if (currentOffset + offsetWithoutChangedTactSize > width - rightOffset - offsetWithoutChangedTactSize) {

                            topOffset += (90 + 30);
                            currentOffset = rightOffset + offsetWithoutChangedTactSize;

                            if (topOffset + 90 > height) {
                                topOffset = startTopOffset;
                                page = pdfDocument.addNewPage();
                                height = page.getPageSizeWithRotation().getHeight();
                                width = page.getPageSizeWithRotation().getWidth();
                                canvas = new PdfCanvas(page);
                            }

                            drawLines(canvas, topOffset);

                        } else {
                            drawLine(
                                canvas,
                                currentOffset,
                                topOffset,
                                currentOffset,
                                topOffset + 5 * 15
                            );
                        }
                        currentOffset += offsetWithoutChangedTactSize;
                    }


                    for (var tc : staveDto.tacts().get(i).tactColumns()) {
                        if (currentOffset > width - rightOffset - offsetWithoutChangedTactSize) {
                            topOffset += (90 + 30);
                            currentOffset = rightOffset + offsetWithoutChangedTactSize;
                            drawLines(canvas, topOffset);
                        }
                        for (int j = 0; j < 6; j++) {
                            if (tc.notes().get(j).value().length() != 0) {
                                drawText(
                                    canvas,
                                    tc.notes().get(j).value(),
                                    currentOffset,
                                    topOffset + j * 15 + 3,
                                    10,
                                    customFont
                                );
                            }
                        }

                        drawPause(canvas, currentOffset + 3, topOffset + 75, tc.duration());

                        double finalCurrentOffset = currentOffset;
                        double finalTopOffset = topOffset;
                        PdfCanvas finalCanvas = canvas;
                        tc.notes().stream().filter(it -> it.value().length() > 0).findFirst().orElseGet(() -> {
                            drawImage(finalCanvas, (float) finalCurrentOffset - 5, (float) finalTopOffset + 15 + 40, data);
                            return null;
                        });
                        currentOffset += noteOffset;
                    }
                }
                k++;
            }
        }
        return baos.toByteArray();
    }
}
