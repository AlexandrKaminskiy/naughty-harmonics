package by.kamen.naughtyharmonicsbackend.util;

import lombok.experimental.UtilityClass;

@UtilityClass
public class NotesConverterUtils {

    public static final int QUANTITY = 12;

    //todo move to freq
    public static final int[] NOTES = {
        QUANTITY * 3 + 5,  //e4
        QUANTITY * 2 + 12, //b3
        QUANTITY * 2 + 8,  //g3
        QUANTITY * 2 + 3,  //d3
        QUANTITY * 1 + 10, //a2
        QUANTITY * 1 + 5,  //e2

    };

    public static int noteToInt(final int string, final int value) {
        return NOTES[string] + value;
    }
}
