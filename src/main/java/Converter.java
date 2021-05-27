import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.*;
import java.util.TreeMap;

public class Converter {
    public static void main(String[] args) {
        try {
            File file = new File(Converter.class.getClassLoader().getResource("lic.txt").getFile());
            BufferedReader b = new BufferedReader(new FileReader(file));

            String[] lines = new String[1000];

            int i = 0;
            String line;
            while ((line = b.readLine()) != null) {
                lines[i++] = line;
            }

            JSONObject res = parse(lines, 0, new LineWrapper());
            BufferedWriter writer = new BufferedWriter(new FileWriter("C:\\Users\\Tom\\Temp\\jednostronna.json"));
            String jsonString = res.getJSONObject("answers").toString();

            ObjectMapper mapper = new ObjectMapper();
            TreeMap<String, Object> jsonMap = mapper.readValue(jsonString, new TypeReference<>() {
            });
            String ss = mapper.writeValueAsString(jsonMap);
            writer.write(ss);
            writer.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static JSONObject parse(String[] lines, int lineNo, LineWrapper lineWrapper) throws IOException {
        if (lines[lineNo] == null) {
            return null;
        }

        if (!startsWithCall(lines[lineNo])) {
            throw new RuntimeException("Wrong line: " + lineNo + ", " + lines[lineNo]);
        }

        JSONObject obj = new JSONObject();
        JSONArray desc = new JSONArray();
        int currentDepth = getDepth(lines[lineNo]);
        do {
            desc.put(lines[lineNo++].substring(currentDepth + 5));
        } while (lines[lineNo] != null && getDepth(lines[lineNo]) == currentDepth + 5);
        obj.put("description", desc);
        JSONObject answers = new JSONObject();
        while (true) {
            if (lines[lineNo] == null || getDepth(lines[lineNo]) <= currentDepth) {
                if (answers.length() > 0) {
                    obj.put("answers", answers);
                }
                lineWrapper.line = lineNo;
                return obj;
            } else if (getDepth(lines[lineNo]) == currentDepth + 3) {
                String call = getCall(lines[lineNo]);
                LineWrapper lw = new LineWrapper();
                JSONObject p = parse(lines, lineNo, lw);
                answers.put(call, p);
                lineNo = lw.line;
            } else {
                throw new RuntimeException("Invalid indentation: " + lineNo + ", " + lines[lineNo] + ", " + currentDepth);
            }
        }
    }

    private static boolean startsWithCall(String line) {
        line = line.strip();
        char a = line.charAt(0);
        char b = line.charAt(1);
        return (((a == '1') || (a == '2') || (a == '3') || (a == '4') || (a == '5') || (a == '6') || (a == '7') || (a == 'P') || (a == '.') || (a == 'X'))
                && ((b == 'N') || (b == 'S') || (b == 'H') || (b == 'D') || (b == 'C') || (b == ' ') || (b == '.')));
    }

    private static String getCall(String line) {
        return line.strip().substring(0, 2);
    }

    private static int getDepth(String line) {
        int depth = 0;
        while (line.startsWith(" ")) {
            depth++;
            line = line.substring(1);
        }
        return depth;
    }

    static class LineWrapper {
        private int line;
    }
}
