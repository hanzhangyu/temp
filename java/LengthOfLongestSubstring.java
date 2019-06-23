import java.util.HashMap;

class LengthOfLongestSubstring {
    // 解法过于复杂，而且还不如使用HashSet
    public static int lengthOfLongestSubstring1(String s) {
        int len = s.length();
        if (len == 0)
            return 0;
        HashMap<Character, Boolean> keyMap = new HashMap<>();
        int maxLen = 1;
        int startIndex = 0;
        int i = startIndex;
        for (; i < len; i++) {
            Character c = s.charAt(i);
            if (keyMap.containsKey(c)) {
                int curLen = i - startIndex;
                if (curLen > maxLen)
                    maxLen = curLen;
                int j = startIndex;
                for (; j < len && j <= i; j++) {
                    Character leftestChar = s.charAt(j);
                    if (leftestChar == c)
                        break;
                    keyMap.remove(leftestChar);
                }
                startIndex = j + 1;
            } else {
                keyMap.put(c, true);
            }
        }
        int curLen = i - startIndex;
        return maxLen > curLen ? maxLen : curLen;
    }

    // 改进：将最后一次出现的地点记录在HashMap中
    public static int lengthOfLongestSubstring(String s) {
        int len = s.length();
        int maxLen = 0;
        int startIndex = 0;
        HashMap<Character, Integer> keyMap = new HashMap<>();
        for (int i = 0; i < len; i++) {
            Character curChar = s.charAt(i);
            int latestIndex;
            if (keyMap.containsKey(curChar) && (latestIndex = keyMap.get(curChar)) >= startIndex) {
                startIndex = keyMap.get(curChar) + 1;
            } else {
                maxLen = Math.max(maxLen, i - startIndex + 1);
            }

            keyMap.put(curChar, i);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("tmmzuxt")); // 5
        System.out.println(lengthOfLongestSubstring("")); // 0
        System.out.println(lengthOfLongestSubstring(" ")); // 1
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // 3
        System.out.println(lengthOfLongestSubstring("aaaaaaa")); // 1
        System.out.println(lengthOfLongestSubstring("pwwkew")); // 3
    }
}